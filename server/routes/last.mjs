import lastElemDb from '../utils/lastElemDb.mjs';

const lastEl = async (req, res) => {
  try {
    const el = await lastElemDb();
    res.status(200).json({ message: el });
  } catch (err) {
    console.error('Error in lastEl:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default lastEl;