const { User, Token } = require('./index.js'); 

async function syncDatabase() {
  try {
    await User.sync(); 
    await Token.sync(); 

    User.hasMany(Token, { foreignKey: 'user_id' });
    
    console.log('Migrate Successful');
  } catch (error) {
    console.error('Migrate Error :', error);
  }
}

syncDatabase();
