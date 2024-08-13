# Base64

<details>
<summary><b>What is Base64?</b></summary>

Base64 is a binary-to-text encoding method that converts binary data from an ASCII string to a radix-64 representation.
</details>

<details>
<summary><b>How does Base64 work?</b></summary>

For example, we need to encode a string `ABCDEFG`

1. Divide the Data

    The binary data is divided into groups of 3 bytes (24 bits each).

    [`ABC`] [`DEF`] [`G`]

2. Convert to 4 ASCII Characters

    Each 24-bit group is then split into four 6-bit groups. These 6-bit groups are then converted into four ASCII characters using a mapping table.

3. Padding

    If the binary data doesn't divide evenly into 3-byte groups, padding is added with equal signs `=` to ensure that the last group has four characters.

4. Resulting Base64 String

    The ASCII characters obtained from the conversion are combined to create the final Base64 encoded string.

[`ABC`] => `QUJD`

[`DEF`] => `REVG`

[`GH`] => `R0g=`

`ABCDEFG` => `QUJDREVGR0g=`
</details>

<details>
<summary><b>What are use cases for Base64?</b></summary>

* Email Attachments

    Convert binary attachments (like images or documents) into a format that can be safely sent via email.

* Data URLs

    When embedding images or other resources directly into web pages using Data URLs, Base64 encoding is used to include the binary data as a text string within the URL.

* Data Transmission

    Base64 encoding is essential for transmitting binary data over text-based protocols like HTTP, SMTP, or FTP.

* Cookies

    Cookies in web development can store small amounts of data, but they must be text. Base64 encoding is used to store non-text data in cookies.

</details>
