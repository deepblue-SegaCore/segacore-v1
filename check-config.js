
require('dotenv').config({ path: '.env.local' })

console.log('🔍 SegaCore V1.0 Configuration Check')
console.log('=' .repeat(40))

// Check environment variables
console.log('\n📋 Environment Variables:')
console.log(`ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? 
  (process.env.ANTHROPIC_API_KEY === 'your_claude_api_key_here' ? '❌ Using placeholder' : '✅ Set') : 
  '❌ Not set'}`)

console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 
  (process.env.DATABASE_URL === 'postgresql://user:password@host:port/segacore_v1' ? '❌ Using placeholder' : '✅ Set') : 
  '❌ Not set'}`)

console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 
  (process.env.JWT_SECRET === 'your_jwt_secret_here' ? '❌ Using placeholder' : '✅ Set') : 
  '❌ Not set'}`)

// Check if Next.js server is running
console.log('\n🌐 Server Status:')
fetch('http://0.0.0.0:3000')
  .then(response => {
    if (response.ok) {
      console.log('✅ Next.js server is running on port 3000')
    } else {
      console.log('⚠️  Server responded but with status:', response.status)
    }
  })
  .catch(error => {
    console.log('❌ Next.js server is not accessible')
    console.log('   Make sure to click the Run button first')
  })

console.log('\n📝 Next Steps:')
console.log('1. Use Replit Secrets to set ANTHROPIC_API_KEY')
console.log('2. Set up Replit PostgreSQL database and update DATABASE_URL')
console.log('3. Generate a secure JWT_SECRET')
console.log('4. Run the full test with: node test-setup.js')
