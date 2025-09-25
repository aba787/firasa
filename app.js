import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jwawrouitfgvvazvorft.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const supabase = createClient(supabaseUrl, supabaseKey)

// مثال: تسجيل مستخدم جديد
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.error(error.message)
  } else {
    console.log("تم إنشاء الحساب:", data)
  }
}

// مثال: تسجيل دخول
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error(error.message)
  } else {
    console.log("تم تسجيل الدخول:", data)
  }
}
