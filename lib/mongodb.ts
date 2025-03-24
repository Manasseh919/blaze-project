import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/auth-app"

// Extend the global object with a mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null }
}

// Initialize cache if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    }

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m.connection)
  }

  global.mongoose.conn = await global.mongoose.promise
  return global.mongoose.conn
}
