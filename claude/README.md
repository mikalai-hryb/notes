# Claude

## Links

* [Claude Chat](https://claude.ai/new)
* [Claude Console](https://https://platform.claude.com/)
* [anthropic.skilljar.com](https://anthropic.skilljar.com/)
* [Course: Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api)

### Claude model families

* `Haiku` - fastest model optimized for speed and cost efficiency
  * `Haiku` is a short, unrhymed Japanese poetic form. It traditionally consists of three lines with a 5-7-5 (17)syllable pattern,
  * no reasoning capabilities like Opus/Sonnet
  * best for real-time user interactions
  * best for high-volume processing

* `Sonnet`- balanced model with good intelligence, speed, and cost efficiency
  * `Sonnet` is a fixed poetic form with a structure traditionally consisting of 14 lines
  * strong coding abilities and precise code editing
  * best for most practical use cases

* `Opus` - highest intelligence model for complex, multi-step tasks requiring deep reasoning and planning
  * `Opus` (in slang and casual conversation) refers to a major creative output or a person's life work
  * trade-off: higher cost and latency.

### Why do you need a server to request Anthropic?

* API requests require a secret API key for authentication
* Exposing this key in client code creates a serious security vulnerability
* Anyone could extract the key and make unauthorized requests

### Which fields must be included in the request?

* `API Key` - Identifies your request to Anthropic
* `Model` - Name of the model to use (like "claude-3-sonnet")
* `Messages` - List containing the user's input text
* `Max Tokens` - Limit for how many tokens Claude can generate

### What are steps of processing a request?

* Tokenization
* Embedding
* Contextualization
* Generation

### What is `Tokenization`?

Claude first breaks your input text into smaller chunks called tokens. These can be whole words, parts of words, spaces, or symbols. For simplicity, think of each word as one token.

### What is `Embedding`?

Each token gets converted into an embedding - a long list of numbers that represents all possible meanings of that word. Think of embeddings as numerical definitions that capture semantic relationships.

### What is `Contextualization`?

Claude refines each embedding based on surrounding words to determine the most likely meaning in context. This process adjusts the numerical representations to highlight the appropriate definition.

### What is `Generation`?

The contextualized embeddings pass through an output layer that calculates probabilities for each possible next word. Claude doesn't always pick the highest probability word - it uses a mix of probability and controlled randomness to create natural, varied responses.

### Which fields are included in the response?

* `Message` - The generated text
* `Usage` - Count of input and output tokens
* `Stop Reason` - Why generation ended
