const { supabaseServiceRole } = require('../config/db');
const { createClient } = require('redis');

const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

redis.on('error', (err) => {
  console.log('Redis connection warning:', err.message);
});

let redisReady = false;

const ensureRedis = async () => {
  if (redisReady && redis.isOpen) return true;

  try {
    if (!redis.isOpen) {
      await redis.connect();
    }
    redisReady = true;
    return true;
  } catch (err) {
    redisReady = false;
    console.warn('Redis unavailable, continuing without cache:', err.message);
    return false;
  }
};

exports.addToCart = async (userId, bookId, quantity, price, cover_url, title) => {
  try {
    const cacheAvailable = await ensureRedis();

    let cartList = [];
    if (cacheAvailable) {
      const cached = await redis.get(String(userId));
      if (cached) {
        try {
          cartList = JSON.parse(cached);
        } catch {
          cartList = [];
        }
      }
    }

    const existing = cartList.find((each) => each.bookId === bookId);
    if (existing) {
      existing.quantity = quantity;
    } else {
      cartList.push({
        bookId,
        cover_url,
        title,
        quantity,
        price,
      });
    }

    if (cacheAvailable) {
      await redis.set(String(userId), JSON.stringify(cartList));
    }

    const { data, error } = await supabaseServiceRole
      .from('cart')
      .upsert(
        { user_id: String(userId), book_id: bookId, quantity, price },
        { onConflict: 'user_id, book_id' }
      )
      .select();

    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error('Model Error (addToCart):', err);
    throw err;
  }
};

exports.getCartItems = async (userId) => {
  try {
    const cacheAvailable = await ensureRedis();

    if (cacheAvailable) {
      const cached = await redis.get(String(userId));
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // Ignore malformed cache and continue to Supabase fallback
        }
      }
    }

    const { data, error } = await supabaseServiceRole
      .from('cart')
      .select('id,user_id,book_id,quantity,price,books(title,cover_url,author,description,stock_count)')
      .eq('user_id', userId);

    if (error) throw error;

    const enriched = data.map((row) => ({
      id: row.id,
      bookId: row.book_id,
      quantity: Number(row.quantity || 0),
      price: Number(row.price || 0),
      title: row.books?.title,
      cover_url: row.books?.cover_url,
      author: row.books?.author,
      itemTotal: Number(row.quantity || 0) * Number(row.price || 0),
    }));

    if (cacheAvailable) {
      await redis.set(String(userId), JSON.stringify(enriched));
    }

    return enriched;
  } catch (err) {
    console.error('Model Error (getCartItems):', err);
    throw err;
  }
};

exports.postPaymentId = async (id) => {
  try {
    const cacheAvailable = await ensureRedis();
    if (cacheAvailable) {
      await redis.del(String(id));
    }

    await supabaseServiceRole
      .from('cart')
      .delete()
      .eq('user_id', id);

    return;
  } catch (err) {
    console.error('Model Error (postPaymentId):', err);
  }
};