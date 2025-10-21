// Netlify Function: Subscribe to Analytics Email Reports
// This function handles subscription requests for analytics email reports

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { email, frequency } = JSON.parse(event.body);

    // Validate input
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    if (!['weekly', 'monthly'].includes(frequency)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid frequency. Must be weekly or monthly.' })
      };
    }

    // Here you would typically:
    // 1. Store the subscription in a database (e.g., Fauna, Airtable, or Google Sheets)
    // 2. Send a confirmation email
    // 3. Schedule the reports using a cron job or scheduled function

    // For now, we'll log it and return success
    console.log('New analytics subscription:', { email, frequency });

    // Example: You could integrate with services like:
    // - SendGrid for email delivery
    // - Mailchimp for managing subscribers
    // - Airtable or Google Sheets for storing subscriptions
    // - Netlify's scheduled functions for sending reports

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to analytics reports',
        email: email,
        frequency: frequency
      })
    };

  } catch (error) {
    console.error('Error processing subscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
