# Web3Forms setup

1. Create an access key in your Web3Forms dashboard and configure `webhustle.in@gmail.com` as the notification recipient.
2. Copy `.env.example` to `.env.local` in the project root.
3. Set `VITE_WEB3FORMS_ACCESS_KEY` in `.env.local` to your access key. No key is included in this repository. Vite variables prefixed with `VITE_` are included in browser code; Web3Forms access keys are designed for this client-side integration. Do not put unrelated private credentials in frontend variables.
4. Restart the Vite dev server after changing the environment file.
5. Run the site, complete all four steps at `/request`, and submit. Confirm the success message and notification email. The form reports success only after Web3Forms confirms the request; failed requests retain the answers so they can be retried.

The request is sent as JSON to `https://api.web3forms.com/submit`. It includes the customer email as both `email` and `replyto`, a project summary, individual answer fields, pricing selections, and an ISO submission timestamp. The hidden `botcheck` field follows Web3Forms' honeypot spam-protection option.
