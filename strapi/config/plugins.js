import fs from 'node:fs';
import path from 'node:path';

/**
 * The documentation plugin sets info['x-generation-date'] to the current date
 * and rewrites full_documentation.json on every start (in development). Keep
 * the previous date when nothing else changed, so the file only changes in git
 * when the documentation does.
 */
const keepGenerationDateWhenUnchanged = (draft) => {
  const docPath = path.join(
    import.meta.dirname,
    '..',
    'src/extensions/documentation/documentation',
    draft.info.version,
    'full_documentation.json'
  );
  let previous;
  try {
    previous = JSON.parse(fs.readFileSync(docPath, 'utf8'));
  } catch {
    return; // first generation
  }
  const previousDate = previous.info?.['x-generation-date'];
  if (!previousDate) {
    return;
  }
  const generatedDate = draft.info['x-generation-date'];
  draft.info['x-generation-date'] = previousDate;
  if (JSON.stringify(draft) !== JSON.stringify(previous)) {
    draft.info['x-generation-date'] = generatedDate;
  }
};

export default ({ env }) => ({
  documentation: {
    config: {
      'x-strapi-config': {
        mutateDocumentation: keepGenerationDateWhenUnchanged,
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env.int('SMTP_PORT', 587),
        secure: env.bool('SMTP_SECURE', false),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO'),
      },
    },
  },
});
