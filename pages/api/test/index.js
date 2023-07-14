import conn from '../../../lib/db'

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
        const query = 'INSERT INTO anime(content) VALUES($1)'
        const values = [req.body.content]
      const result = await conn.query(
          query,
          values
      );
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };