
const { createTables, getDatabase } = require('./lib/database.ts')
const Anthropic = require('@anthropic-ai/sdk')

async function testClaudeAPI() {
  console.log('\n🧠 Testing Claude API Key...')
  
  try {
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_claude_api_key_here') {
      throw new Error('ANTHROPIC_API_KEY not set or using placeholder value')
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 50,
      messages: [{
        role: 'user',
        content: 'Hello, please respond with "Claude API is working!"'
      }]
    })

    const response = message.content[0].type === 'text' ? message.content[0].text : ''
    console.log('✅ Claude API Response:', response)
    return true
  } catch (error) {
    console.error('❌ Claude API Error:', error.message)
    return false
  }
}

async function testDatabase() {
  console.log('\n🗄️  Testing Database Connection...')
  
  try {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'postgresql://user:password@host:port/segacore_v1') {
      throw new Error('DATABASE_URL not set or using placeholder value')
    }

    const db = getDatabase()
    
    // Test basic connection
    const result = await db.query('SELECT NOW() as current_time')
    console.log('✅ Database Connection:', result.rows[0].current_time)
    
    // Test table creation
    await createTables()
    console.log('✅ Database Tables: Created successfully')
    
    // Test table structure
    const tablesResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    
    const tables = tablesResult.rows.map(row => row.table_name)
    console.log('✅ Available Tables:', tables)
    
    // Test inserting sample data
    await db.query(`
      INSERT INTO projects (name, description, manager, budget, deadline) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT DO NOTHING
    `, ['Test Project', 'SegaCore V1.0 Test', 'Test Manager', 100000, '2024-12-31'])
    
    const projectsResult = await db.query('SELECT COUNT(*) as count FROM projects')
    console.log('✅ Sample Data: Projects count =', projectsResult.rows[0].count)
    
    return true
  } catch (error) {
    console.error('❌ Database Error:', error.message)
    return false
  }
}

async function testSegaCoreAPI() {
  console.log('\n🎯 Testing SegaCore Intelligence API...')
  
  try {
    const response = await fetch('http://localhost:3000/api/segacore-intelligence', {
      method: 'GET'
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ SegaCore API Response: Intelligence generated successfully')
      console.log('   Alert Level:', data.intelligence?.alertLevel)
      console.log('   Schedule Status:', data.intelligence?.progressAnalysis?.scheduleStatus)
      return true
    } else {
      throw new Error(`API returned status ${response.status}`)
    }
  } catch (error) {
    console.error('❌ SegaCore API Error:', error.message)
    return false
  }
}

async function runAllTests() {
  console.log('🚀 SegaCore V1.0 Setup Test Suite')
  console.log('=' .repeat(50))
  
  const results = {
    claude: await testClaudeAPI(),
    database: await testDatabase(),
    segacore: await testSegaCoreAPI()
  }
  
  console.log('\n📊 Test Results Summary:')
  console.log('=' .repeat(50))
  console.log(`Claude API:     ${results.claude ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Database:       ${results.database ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`SegaCore API:   ${results.segacore ? '✅ PASS' : '❌ FAIL'}`)
  
  const allPassed = Object.values(results).every(result => result === true)
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! SegaCore V1.0 is ready to use!')
  } else {
    console.log('\n⚠️  Some tests failed. Please check the configuration:')
    if (!results.claude) console.log('   - Set your Claude API key in Secrets')
    if (!results.database) console.log('   - Set up Replit PostgreSQL database')
    if (!results.segacore) console.log('   - Ensure the Next.js server is running')
  }
  
  process.exit(allPassed ? 0 : 1)
}

runAllTests()
