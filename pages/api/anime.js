import { Pool } from 'pg';

const pool = new Pool({
  user: 'bernardsheng',
  host: 'localhost',
  database: 'bernardsheng',
  password: 'bernards',
  port: 5432,
});

const getAnimes = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM anime ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
  }

const insertAnime = (req) => {
    const {title, imageUrl, url, rating} = req.body;
    pool.query(
        'INSERT INTO anime (id, title, image_url, url, rating) VALUES ($1, $2, $3, $4, $5)',
        [req.params.id, title, imageUrl, url, rating],
        (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error inserting data');
          } else {
            res.status(200).send('Data inserted successfully');
          }
        }
    );
     
}

const deleteAnime = () => {
    
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
    if (error) {
        reject(error)
    } else {
        resolve(`Anime deleted with ID: ${id}`)
        }
    });
         
}

module.exports = {
    getAnimes,
    insertAnime,
    deleteAnime,
}