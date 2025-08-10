import express from 'express';
import jwt from 'jsonwebtoken';   
const router = express.Router();


router.get('/protected', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ token, decoded }); // send token back to UI
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

 

 
export default router;
