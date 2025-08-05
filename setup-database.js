
const { createTables } = require('./lib/database.ts')

async function setupDatabase() {
  try {
    console.log('Setting up SegaCore V1.0 database tables...')
    await createTables()
    console.log('✅ Database tables created successfully!')
    console.log('Tables created: projects, documents, intelligence')
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()
