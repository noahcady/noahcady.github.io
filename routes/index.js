const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Contact form submission
router.post('/contact', (req, res) => {
  const { name, email, 'project-type': projectType, message } = req.body;

  // Log the submission (replace with email service or database in production)
  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Project Type: ${projectType}`);
  console.log(`Message: ${message}`);
  console.log('----------------------------------');

  res.json({
    success: true,
    message: 'Thank you for reaching out! I\'ll get back to you within 48 hours.',
  });
});

module.exports = router;
