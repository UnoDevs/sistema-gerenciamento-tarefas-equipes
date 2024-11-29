import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import * as path from "path";

export const MailerConfig: MailerOptions = {
    template: {
        dir: path.resolve(__dirname, "..", "..", "src/templates"),
        adapter: new HandlebarsAdapter(),
        options: {
            extName: ".hbs",
            layoutsDir: path.resolve(__dirname, "..", "..", "src/templates"),
            strict: true
        }
    },
    transport: "smtps://user@domain.com:pass@smtp.domain.com",
    defaults: {
        from: '"nest-modules" <user@domain.com>'
    }
};
