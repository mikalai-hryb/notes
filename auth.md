 https://www.geeksforgeeks.org/session-vs-token-based-authentication/#:~:text=The%20main%20difference%20is%20session,one%20the%20client%20stores%20them.
 session based authentication
 the server creates and stores the session data in the server memory when the user logs in and then stores the session Id in a cookie on the user browser.

 A session is a small file, most likely in JSON format, that stores information about the user, such as a unique ID, time of login and expirations, and so on. It is generated and stored on the server so that the server can keep track of the user requests


 JWT tokens contain claims, which are statements about the subject (for example the logged in user). These statements can be things like name, email, roles etc. JWT tokens are digitally signed and not vulnerable to CSRF attacks.


Hash-based message authentication code (or HMAC) is a cryptographic authentication technique that uses a hash function and a secret key. With HMAC, you can achieve authentication and verify that data is correct and authentic with shared secrets, as opposed to approaches that use signatures and asymmetric cryptography


A JSON Web Token consists of 3 parts as Header, Payload, and Signature.
