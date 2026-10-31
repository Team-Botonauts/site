# Botonauts Website

This is a website built using the Astro framework for the Botonauts FTC Robotics Team. It has our team pictures, robot, fundraising and social links, and we will use & update it throughout the season.

> The site is hosted at [botonauts.uk](https://botonauts.uk).


## Tech stack
- Astro: web framework
- Tailwind CSS: website styling
- Cloudflare pages: hosting
- Cloudlfare functions: contact form backend
- Resend: email delivery

## How to use
Clone the repo:
```bash
git clone https://github.com/Team-Botonauts/site.git
```

Install dependencies:
```bash
npm install
```

Make a .env file (optional, for the contact form to work)
```
RESEND_API_KEY=your-api-key
CONTACT_TO=email-to-send-mail@example.com
```

To run the website and the cloudflare function for the contact form, run:
```bash
npm run cfdev
```
This builds the site and runs it through Cloudflare Wrangler.

Otherwise, for just the site, run:
```bash
npm run dev
```