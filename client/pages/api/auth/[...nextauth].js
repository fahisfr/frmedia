import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "872726855804-6pvlu0uu6bofm88em64vdvnav214k5b9.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const token = jwt.sign( profile, "jwt");
        return `/register/google?token=${token}`;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// https://codedamn.com/register?provider=google&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJamsxTlRFd05HRXpOMlpoT1RBelpXUTRNR00xTnpFME5XVmpPV1U0TTJWa1lqSTVZakJqTkRVaUxDSjBlWEFpT2lKS1YxUWlmUS5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyRmpZMjkxYm5SekxtZHZiMmRzWlM1amIyMGlMQ0poZW5BaU9pSXpNREF5TURneE1qTTRNekF0ZG1ocU9UUmxjMjgwZFRCMWRqRnVhelp0YnpOdk56TnFNMmx0TjNCMmRqRXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0poZFdRaU9pSXpNREF5TURneE1qTTRNekF0ZG1ocU9UUmxjMjgwZFRCMWRqRnVhelp0YnpOdk56TnFNMmx0TjNCMmRqRXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0p6ZFdJaU9pSXhNRFl4TWprMU1qQTBNalF3TmpVeE1UTXlNamNpTENKbGJXRnBiQ0k2SW5KaGFHMWhibVpoYUdsek16SXhRR2R0WVdsc0xtTnZiU0lzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSmhkRjlvWVhOb0lqb2lielpyYVhrMVVsOVhhR3d3ZGs5TmRUVnVRVlZsZHlJc0ltNWhiV1VpT2lKR1VpQkNiM2tpTENKd2FXTjBkWEpsSWpvaWFIUjBjSE02THk5c2FETXVaMjl2WjJ4bGRYTmxjbU52Ym5SbGJuUXVZMjl0TDJFdlFVeHROWGQxTWtGNVJ6VmlaMUV6TW1oMWFXMXZVWFJDT0hFeU0zVkVaV1pxV1RsTVdWUmtORTVtWVRjOWN6azJMV01pTENKbmFYWmxibDl1WVcxbElqb2lSbElpTENKbVlXMXBiSGxmYm1GdFpTSTZJa0p2ZVNJc0lteHZZMkZzWlNJNkltVnVJaXdpYVdGMElqb3hOalkyTURjek16RXpMQ0psZUhBaU9qRTJOall3TnpZNU1UTjkuaGV0Rll3LVI3LXg4Zi1jWGpYSDNpSHBpRm5FVnBoRGxjWWJFbGQtZC1iUjJWbDZqd2kzTFNaeDhDUHlMWEstaWZvN2NwRTBSTzlRTDJFVmZ5blU5a2FVbDJ3a0N5cHMtRlNsQ2FUYW11em9XVmNadlB3eFRMd2lSamgtMGFIcmRDMmhhcUgwdUNheVRuamVYOGt6bG5hMWhocUd0REFTNXZaRWhsMVdpWXdjajJLTjEyYjVwbGE4TEM1bWhhOWlySDdLaGp3TjNVb0o4RW5weUtKRlJYSU52Z1p2bUo0MGlsTWdJOWRkYVExYjRqWW14cUFWaEVpM0F5OE5rV0ZSOXVldFlzTzZHdXc3bDU0WnZYZ21wMEpYWGNDRFczb2laQkI2WEEzeDZqNjdwYkMwTF9SZC03bXpvZFZGTk90c0QxODNRbG1sZkNYa3dnTzFaT19VUUxRIiwibmFtZSI6IkZSIEJveSIsImlhdCI6MTY2NjA3MzMxM30.NZk16XhrU3RfP8WoD2PGTPmvu-HGh5YQ7efyuQmmp-Q
