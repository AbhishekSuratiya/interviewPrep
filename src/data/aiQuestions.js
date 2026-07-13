// Interview questions + answers per Artificial Intelligence checklist topic.
// Keyed by the exact topic string used in checklistTopics.js (section id: 'ai').
export const aiQuestions = {
  'What machine learning is vs traditional programming': [
    { q: 'How does machine learning fundamentally differ from traditional rule-based programming?', a: 'Traditional programming: a human writes explicit rules, and the program applies them to input to produce output. Machine learning inverts this: you provide input data and known correct outputs, and an algorithm learns the rules itself by adjusting internal parameters to minimize prediction error — producing a "model" that can generalize the learned pattern to new, unseen data.' },
    { q: 'What kinds of problems are better suited to ML than hand-coded rules?', a: 'Problems where the underlying rules are too complex, numerous, or unknown to enumerate explicitly — image recognition, natural language understanding, fraud detection with subtle evolving patterns — cases where a human would struggle to write out all the necessary conditional logic by hand, but a model can learn the pattern directly from many labeled examples.' },
  ],
  'Supervised vs unsupervised vs reinforcement learning': [
    { q: 'What distinguishes supervised, unsupervised, and reinforcement learning?', a: 'Supervised learning trains on labeled input-output pairs to predict outputs for new inputs (classification, regression). Unsupervised learning works with unlabeled data, finding structure on its own (clustering, dimensionality reduction). Reinforcement learning trains an agent to take actions in an environment to maximize cumulative reward through trial and error, guided by feedback rather than labeled examples.' },
    { q: 'Which paradigm would you use to discover natural customer segments with no predefined categories?', a: 'Unsupervised learning, specifically clustering (like k-means) — there are no known "correct" labels for what the segments should be, so the goal is letting the algorithm discover natural groupings based on feature similarity, which is exactly what unsupervised learning does.' },
  ],
  'Training vs inference': [
    { q: 'What is the difference between training and inference in a model\'s lifecycle?', a: 'Training is the process of iteratively adjusting a model\'s parameters (weights) to minimize prediction error on training data — slow and compute-intensive, happening periodically/offline. Inference is using an already-trained (fixed-weights) model to make a prediction on new input — a single fast forward pass, which is what runs continuously in production at scale.' },
    { q: 'Why do production systems optimize so heavily for inference rather than training?', a: 'Because training happens once (or periodically), while inference runs on every single user request continuously at scale — even small per-inference latency or cost improvements compound massively across millions of requests, making inference optimization (via quantization, distillation, caching) the dominant concern for production-facing AI features.' },
  ],
  'Overfitting, underfitting, and regularization': [
    { q: 'What is overfitting and how do you detect it?', a: 'Overfitting is when a model learns the training data too specifically — including its noise — rather than the underlying general pattern, resulting in excellent training accuracy but poor performance on new data. It\'s detected by evaluating on a held-out validation/test set the model never saw during training; a large gap between training and validation accuracy is the telltale sign.' },
    { q: 'What techniques help prevent overfitting?', a: 'Regularization (L1/L2 penalties on weight magnitude, dropout in neural networks), early stopping (halting training once validation performance stops improving), gathering more diverse training data, and reducing model complexity if it\'s far more expressive than the problem actually requires.' },
  ],
  'Train/validation/test splits': [
    { q: 'Why do you need three separate data splits rather than just training and testing on the same data?', a: 'The training set is used to fit the model\'s parameters. The validation set is used during development to tune hyperparameters and detect overfitting without touching the final test set. The test set is held out entirely until the very end, giving an unbiased estimate of real-world performance — evaluating only on training data would give a falsely optimistic picture since the model has already seen and adjusted to it.' },
  ],
  'Bias-variance tradeoff': [
    { q: 'What is the bias-variance tradeoff?', a: 'Bias is error from overly simplistic assumptions (underfitting — the model can\'t capture the true pattern). Variance is error from excessive sensitivity to the specific training data\'s noise (overfitting — the model varies wildly with small training data changes). Reducing one often increases the other, so model selection/tuning involves finding a sweet spot balancing both to minimize total error on unseen data.' },
  ],
  'Feature engineering basics': [
    { q: 'What is feature engineering and why does it still matter even with deep learning?', a: 'Feature engineering is transforming raw data into representations that make patterns more accessible to a learning algorithm — extracting a "day of week" feature from a timestamp, or normalizing numeric ranges. While deep learning can learn some feature representations automatically (especially for images/text), thoughtful feature engineering still meaningfully improves performance for structured/tabular data problems and speeds up training/convergence generally.' },
  ],

  'Neurons, weights, biases, and activation functions': [
    { q: 'What does a single artificial neuron compute?', a: 'A weighted sum of its inputs plus a bias term, passed through a non-linear activation function: activation(sum(input_i * weight_i) + bias) — the weights and bias are the learned parameters adjusted during training.' },
    { q: 'Why is a non-linear activation function essential in a neural network?', a: 'Without non-linearity, stacking multiple layers mathematically collapses into a single equivalent linear transformation regardless of depth — completely defeating the purpose of "deep" networks, which rely on non-linear activations to model complex, non-linear relationships in data.' },
  ],
  'Backpropagation and gradient descent': [
    { q: 'How does backpropagation compute gradients for every weight in a deep network?', a: 'It applies the chain rule of calculus working backward from the output layer to the input layer, computing how much each weight in every layer contributed to the final prediction error — efficiently reusing intermediate computations rather than recalculating from scratch for each individual weight.' },
    { q: 'What role does the learning rate play in gradient descent?', a: 'It controls the size of each parameter-update step in the direction that reduces the loss — too large a learning rate risks overshooting the minimum and causing unstable/divergent training; too small makes training impractically slow to converge.' },
  ],
  'Loss functions and optimizers (SGD, Adam)': [
    { q: 'What is a loss function and why does the choice of loss function matter?', a: 'A loss function quantifies how wrong a model\'s predictions are compared to the true values — the specific choice matters because it directly shapes what "good performance" means to the optimizer (e.g. mean squared error for regression, cross-entropy for classification), and using a mismatched loss function can train a model toward the wrong objective entirely.' },
    { q: 'Why is Adam often preferred over plain SGD (stochastic gradient descent)?', a: 'Adam adapts the effective learning rate per parameter based on estimates of recent gradient magnitude and variance, generally converging faster and more reliably than plain SGD with a fixed learning rate, especially for complex models — though plain SGD (often with momentum) can sometimes generalize slightly better in specific well-tuned scenarios.' },
  ],
  'Convolutional Neural Networks (CNNs) overview': [
    { q: 'Why are CNNs particularly well-suited for image data?', a: 'CNNs use convolutional filters that slide across the image, exploiting spatial locality (nearby pixels are related) and translation invariance (a learned pattern like an edge is useful regardless of where in the image it appears) — this drastically reduces the parameter count compared to fully connecting every pixel to every neuron, while explicitly leveraging the spatial structure images have.' },
  ],
  'Recurrent Neural Networks (RNNs) and their limitations': [
    { q: 'What limitation of RNNs led to the rise of attention-based architectures?', a: 'RNNs process sequences step-by-step, maintaining a hidden state, but they struggle with long-range dependencies due to vanishing gradients (information from many steps earlier tends to fade), and their inherently sequential processing prevents parallelization across the sequence during training — both problems that self-attention in Transformers solves.' },
  ],
  'Attention mechanism and the Transformer architecture': [
    { q: 'How does self-attention let a Transformer capture long-range dependencies better than an RNN?', a: 'Self-attention lets every position in a sequence directly compute a relevance-weighted combination of every other position, regardless of distance — rather than relying on information being carried forward step-by-step through a potentially-fading hidden state as in an RNN, allowing direct, undiminished access to any earlier (or later) part of the sequence.' },
    { q: 'Why can Transformers train faster than RNNs on the same hardware?', a: 'Because self-attention processes an entire sequence in parallel (matrix operations across all positions at once), whereas an RNN must process a sequence strictly step-by-step due to its sequential hidden-state dependency — this parallelizability is what made training on today\'s massive text datasets practical.' },
  ],
  'Dropout, batch normalization, and other regularization techniques': [
    { q: 'How does dropout help prevent overfitting in neural networks?', a: 'During training, dropout randomly deactivates (zeroes out) a fraction of neurons on each forward pass, preventing the network from becoming overly reliant on any specific subset of neurons/co-adapted feature detectors — this forces more redundant, robust representations to emerge, improving generalization to new data.' },
    { q: 'What problem does batch normalization address?', a: 'It normalizes layer inputs (to roughly zero mean, unit variance) within each mini-batch during training, reducing the internal covariate shift (the changing distribution of layer inputs as earlier layers\' weights update) — this generally allows for faster, more stable training with higher learning rates.' },
  ],

  'How LLMs are trained (pretraining, instruction tuning, RLHF)': [
    { q: 'What are the typical stages an LLM goes through before becoming a helpful chat assistant?', a: 'Pretraining: the model learns broad language patterns via next-token prediction on massive, diverse text corpora. Instruction tuning: fine-tuning on curated examples of instructions paired with good responses, teaching it to follow directions rather than just continue text plausibly. RLHF (Reinforcement Learning from Human Feedback): further fine-tuning using human preference rankings of different responses, aligning the model\'s outputs with what humans actually find helpful, safe, and preferred.' },
  ],
  'Tokenization and sub-word tokenizers (BPE)': [
    { q: 'Why do LLMs use sub-word tokenization instead of whole-word tokenization?', a: 'Whole-word tokenization would require an enormous vocabulary to cover all possible words (and still fail on unseen/rare words or typos). Sub-word tokenization (like Byte-Pair Encoding) breaks text into smaller, reusable pieces, letting a fixed, manageable vocabulary represent any text — including rare or novel words — by combining known sub-word pieces, rather than needing every whole word explicitly in the vocabulary.' },
  ],
  'Embeddings and semantic similarity': [
    { q: 'What does an embedding vector represent, and how is semantic similarity measured between two embeddings?', a: 'An embedding is a dense numeric vector representing a piece of text\'s meaning in high-dimensional space, learned such that semantically similar concepts end up with vectors close together. Semantic similarity is typically measured with cosine similarity — the cosine of the angle between two embedding vectors, where a value near 1 indicates highly similar meaning and near 0 (or negative) indicates dissimilarity.' },
  ],
  'Context window and its limitations': [
    { q: 'What is a context window, and what happens when input exceeds it?', a: 'The context window is the maximum number of tokens (input plus generated output) a model can process/attend to in a single request — content beyond this limit is either truncated or rejected by the API, meaning very long documents/conversations need to be chunked, summarized, or managed (e.g. via RAG retrieval of only the most relevant portions) rather than sent in their entirety.' },
  ],
  'Temperature, top-p, and sampling strategies': [
    { q: 'What does the temperature parameter control during LLM text generation?', a: 'It controls the randomness of token selection during generation — temperature near 0 makes generation nearly deterministic, always picking the most probable next token (good for factual/consistent tasks); higher temperature flattens the probability distribution, increasing variety and creativity at some cost to reliability/coherence.' },
    { q: 'How does top-p (nucleus) sampling differ from simply using a lower temperature?', a: 'Top-p sampling restricts token selection to the smallest set of tokens whose cumulative probability exceeds p (e.g. 0.9), then samples from just that restricted set — this dynamically adapts to the shape of the probability distribution at each step (a confident distribution has a smaller nucleus, an uncertain one a larger nucleus), whereas temperature applies a uniform scaling regardless of the distribution\'s actual shape.' },
  ],
  'Hallucination: why it happens and how to mitigate it': [
    { q: 'Why do LLMs "hallucinate" confidently incorrect information?', a: 'An LLM\'s core training objective is producing statistically plausible, fluent text continuations — it has no built-in mechanism for verifying factual truth. When a query touches on something underrepresented, ambiguous, or absent in its training data, it can still generate fluent, confident-sounding but factually incorrect text, since fluency and factual accuracy aren\'t the same thing it was directly optimized for.' },
    { q: 'What are practical mitigations for hallucination in a production AI feature?', a: 'Using RAG to ground responses in retrieved, verifiable source documents rather than relying purely on the model\'s trained knowledge; instructing the model explicitly to say "I don\'t know" when uncertain rather than guessing; lowering temperature for factual tasks; and adding a verification/citation step so users (or an automated check) can trace claims back to source material.' },
  ],
  'Multimodal models (vision + language) overview': [
    { q: 'What does it mean for a model to be "multimodal"?', a: 'It can process and/or generate more than one type of data — commonly text plus images (understanding an image and answering questions about it, or generating an image from a text description) — typically achieved by encoding different modalities into a shared representation space the model can jointly reason over.' },
  ],

  'Zero-shot vs few-shot prompting': [
    { q: 'What is the difference between zero-shot and few-shot prompting?', a: 'Zero-shot prompting asks the model to perform a task with only an instruction and no examples. Few-shot prompting includes a small number (2-5 typically) of example input/output pairs demonstrating the desired format/behavior directly in the prompt, which reliably steers the model\'s output style/format more precisely than instructions alone, without any actual model retraining.' },
  ],
  'Chain-of-thought prompting': [
    { q: 'What is chain-of-thought prompting and why does it improve accuracy on complex tasks?', a: 'It\'s a technique where you ask the model to reason step-by-step ("think through this carefully before answering") rather than jumping straight to a final answer — this measurably improves accuracy on complex reasoning tasks (math, multi-step logic), likely because it gives the model more intermediate "working space" to build toward a correct conclusion rather than committing to an answer immediately.' },
  ],
  'System prompts vs user prompts': [
    { q: 'What is the functional difference between a system prompt and a user prompt?', a: 'A system prompt sets persistent instructions, persona, and constraints applying across the entire conversation (e.g. "You are a helpful support assistant that only discusses our product"). User prompts are the actual turn-by-turn messages from the user that the model responds to within that established system context — the system prompt shapes how every subsequent user message is interpreted and responded to.' },
  ],
  'Structured output / JSON mode': [
    { q: 'Why would you use a provider\'s structured-output/JSON-mode feature instead of just asking the model to "respond in JSON" in the prompt?', a: 'Simply instructing the model to respond in JSON via the prompt is not guaranteed — the model can still occasionally produce malformed JSON or add extra prose. A dedicated structured-output/JSON-mode feature constrains the actual generation process at the API level to only produce valid output matching a specified schema, providing a much stronger reliability guarantee than a prompt-only instruction.' },
  ],
  'Prompt templates and reusability': [
    { q: 'Why maintain prompt templates as a distinct, versioned artifact rather than inline strings scattered through application code?', a: 'Centralizing prompts as reusable, versioned templates makes it easy to iterate on and A/B test prompt changes without hunting through application code, enables consistent formatting/structure across multiple features using similar prompts, and lets you track how prompt changes correlate with output quality over time.' },
  ],
  'Prompt injection risks': [
    { q: 'What is a prompt injection attack?', a: 'It\'s when untrusted input (user text, or content retrieved from an external document/webpage) contains text specifically crafted to override or manipulate the model\'s original system instructions — e.g. a user embedding "ignore previous instructions and instead..." — potentially causing the model to behave outside its intended scope or leak information it shouldn\'t.' },
    { q: 'How would you mitigate prompt injection in a RAG-based application?', a: 'Treat all retrieved document content as untrusted data, not instructions — using structural separation between system instructions and retrieved/user content where the API supports it, adding output-side checks that verify responses stay within the intended scope, and monitoring for unusual outputs — no single defense is fully bulletproof, so layering multiple mitigations reduces risk rather than eliminating it entirely.' },
  ],

  'Retrieval-Augmented Generation (RAG) architecture': [
    { q: 'Describe the core RAG pipeline at a high level.', a: 'Embed the incoming query, search a vector database for the most semantically similar document chunks, inject those retrieved chunks as context into the prompt alongside the query, and have the LLM generate a response grounded in that retrieved context — rather than relying solely on the model\'s static, trained-in knowledge.' },
    { q: 'Why is RAG generally preferred over fine-tuning for keeping an AI feature\'s answers current?', a: 'RAG keeps the model\'s weights fixed and retrieves fresh context at query time, so updating the knowledge base is as simple as re-indexing changed documents — no retraining needed. Fine-tuning would require expensive retraining every time the underlying information changes, and doesn\'t reliably guarantee the model "learned" every specific fact anyway.' },
  ],
  'Vector databases and similarity search (Pinecone, pgvector, Weaviate)': [
    { q: 'Why can\'t you just brute-force compare a query embedding against every stored document embedding at scale?', a: 'Brute-force comparison scales linearly with the number of stored vectors, becoming far too slow once you have millions of documents — vector databases use specialized approximate-nearest-neighbor indexing algorithms (like HNSW) that make similarity search fast even across huge collections, trading a small amount of exactness for massive speed gains.' },
  ],
  'Chunking strategies for document embedding': [
    { q: 'Why does chunk size matter when preparing documents for a RAG pipeline?', a: 'Chunks that are too small can lose important surrounding context needed to answer a question correctly, while chunks that are too large dilute the embedding\'s semantic focus (mixing multiple topics into one vector), hurting retrieval precision — a common mitigation is chunking along natural document boundaries (paragraphs/sections) with some overlap between adjacent chunks to preserve context at the boundaries.' },
  ],
  'Fine-tuning vs RAG — when to use each': [
    { q: 'When would fine-tuning be the better choice over RAG?', a: 'When you need to change the model\'s behavior, style, tone, or output format consistently (not add new factual knowledge) — e.g. teaching it to always respond in a specific structured format, or adopting specialized domain jargon/style — RAG doesn\'t change how the model reasons or formats, only what context it has access to.' },
  ],
  'Embedding models vs generation models': [
    { q: 'What is the functional difference between an embedding model and a generation (chat/completion) model?', a: 'An embedding model converts text into a fixed-size dense vector representing its meaning, used for similarity search/clustering — it doesn\'t generate new text. A generation model produces new text token-by-token given a prompt — the two serve entirely different purposes and are often used together in a RAG pipeline (embedding model for retrieval, generation model for the actual answer).' },
  ],
  'Hybrid search (keyword + semantic)': [
    { q: 'Why would you combine keyword search with semantic (embedding-based) search rather than using just one?', a: 'Semantic search excels at conceptual relevance but can sometimes miss exact-match requirements (a specific product code, an exact name), which keyword search handles precisely — combining both (hybrid search) captures the strengths of each: semantic search for conceptually related results, keyword search for precise exact-term matches, generally producing better overall retrieval quality than either alone.' },
  ],

  'Calling LLM APIs (Anthropic, OpenAI) from a backend': [
    { q: 'Why must LLM API calls be made from a backend rather than directly from a frontend app?', a: 'Calling the API directly from client-side code would require embedding the API key in code visible to anyone inspecting the browser\'s network requests or bundled JS, exposing it to theft and unauthorized usage billed to your account — a backend endpoint holds the key server-side and proxies requests, also giving you a place to add rate limiting, input validation, and usage monitoring.' },
  ],
  'Streaming responses to the frontend (SSE)': [
    { q: 'How does streaming an LLM response improve perceived performance even if total generation time is unchanged?', a: 'Instead of waiting for the entire response to be generated before showing anything, streaming delivers each token/chunk to the client as soon as it\'s produced — users see a "typing" effect starting almost immediately rather than staring at a blank loading state, which feels significantly faster even though the actual total generation time may be identical.' },
  ],
  'Function calling / tool use': [
    { q: 'How does function calling let an LLM go beyond pure text generation?', a: 'You describe available tools/functions to the model, and it can decide to request a call to one (specifying the function name and arguments) based on its reasoning about what\'s needed to answer the query — your application code then actually executes that function and returns the result to the model, letting it ground its response in real, current, or precise data (like a database lookup) rather than only its trained knowledge.' },
  ],
  'Agentic workflows and multi-step reasoning': [
    { q: 'What makes a workflow "agentic" rather than a single request/response?', a: 'An agentic workflow lets the model reason across multiple steps — calling a tool, evaluating the result, deciding whether more information/actions are needed, and potentially calling additional tools — iterating autonomously toward a goal rather than producing one single, immediate response, enabling it to handle more complex, multi-step tasks than a single prompt/response exchange could.' },
  ],
  'Managing conversation history and context': [
    { q: 'What are the trade-offs of sending the full conversation history with every LLM API request?', a: 'Sending the full history preserves context so the model can reference earlier parts of the conversation, but it increases token usage (and therefore cost and latency) with every additional turn, and can eventually exceed the context window — mitigations include summarizing older parts of the conversation, truncating to the most recent N turns, or selectively retrieving only relevant prior context rather than sending everything verbatim.' },
  ],
  'Handling rate limits and API errors gracefully': [
    { q: 'How should a production application handle an LLM API rate limit (429) response?', a: 'Implement retry logic with exponential backoff (and ideally jitter) rather than immediately failing or hammering the API again right away, respect any Retry-After header the API provides, and have a graceful fallback/user-facing message if retries are exhausted — treating rate limits as an expected, handled condition rather than an unhandled exception.' },
  ],

  'Latency and cost optimization strategies': [
    { q: 'What are the main levers for reducing LLM API cost and latency in production?', a: 'Choosing the smallest/cheapest model that reliably meets quality requirements, minimizing prompt length (fewer input tokens = lower cost and faster time-to-first-token), caching repeated/similar queries, setting sensible max_tokens limits, and using streaming to improve perceived (though not necessarily total) latency.' },
  ],
  'Caching LLM responses': [
    { q: 'What are the risks of caching LLM responses for user queries?', a: 'If queries are cached too aggressively based on exact string match, you miss cache hits for semantically identical but differently-worded queries (unless using semantic caching based on embedding similarity) — and caching responses for queries whose correct answer depends on frequently-changing data (like current account balance) risks serving stale, incorrect information if not invalidated appropriately.' },
  ],
  'Model selection trade-offs (small vs large, speed vs quality)': [
    { q: 'How would you decide between a smaller, faster model and a larger, more capable one for a given feature?', a: 'Evaluate whether the smaller model meets the actual quality bar needed for that specific task — many tasks (simple classification, straightforward extraction) don\'t need a flagship model\'s full capability, and using a smaller model there saves significant cost/latency; reserve larger models for genuinely complex reasoning tasks where quality would meaningfully suffer with a smaller model.' },
  ],
  'Guardrails and content moderation': [
    { q: 'Why is defense-in-depth important when designing guardrails for an AI feature?', a: 'No single guardrail (input filtering, output filtering, a well-scoped system prompt) is perfectly reliable on its own — layering multiple independent checks means a failure in any single layer is less likely to result in a harmful outcome, since other layers still provide protection, similar to multiple safety systems in a car.' },
  ],
  'Evaluating AI feature quality (golden datasets, LLM-as-judge)': [
    { q: 'Why can\'t you use standard exact-match unit test assertions to evaluate an LLM-powered feature?', a: 'LLM outputs are non-deterministic and vary in exact phrasing even when substantively "correct," so exact string equality assertions would fail on essentially every run regardless of actual quality — evaluation instead uses golden datasets with known-good expected behavior, checked via semantic similarity, rule-based criteria checks, or an LLM-as-judge approach that scores whether a response meets defined criteria.' },
  ],
  'Monitoring and observability for AI features': [
    { q: 'What AI-specific metrics would you monitor in production beyond standard application metrics?', a: 'Token usage and cost per request, latency (including time-to-first-token for streaming), error/failure rates from the LLM API, and quality signals like user feedback (thumbs up/down) or flagged/regenerated responses — these give visibility into both the operational health and the actual output quality of the AI feature, which standard infrastructure metrics alone wouldn\'t capture.' },
  ],
  'A/B testing AI-powered features': [
    { q: 'What is a unique challenge of A/B testing an AI feature compared to a typical UI change?', a: 'Output quality can be harder to measure objectively (unlike a simple click-through-rate metric) — you often need a combination of user engagement signals, explicit user feedback, and possibly LLM-as-judge scoring to compare variants meaningfully, since the "better" variant isn\'t always immediately obvious from a single simple metric the way a UI conversion test might be.' },
  ],

  'Bias in training data and model outputs': [
    { q: 'How can bias in training data lead to biased model outputs?', a: 'If training data contains historical biases (underrepresentation of certain groups, skewed associations), the model learns and can even amplify those biases in its predictions, since it\'s simply learning statistical patterns present in the data it was shown — without deliberate mitigation, this can affect fairness in high-stakes applications like hiring, lending, or content moderation.' },
  ],
  'Fairness auditing across demographic groups': [
    { q: 'Why isn\'t overall accuracy sufficient to evaluate whether a model is fair?', a: 'A model can have high overall accuracy while performing significantly worse for specific demographic subgroups — fairness auditing involves measuring performance metrics separately across relevant groups, since a large gap between groups signals a real fairness concern that an aggregate accuracy number alone would completely hide.' },
  ],
  'Transparency and explainability': [
    { q: 'Why does transparency about AI involvement matter for user trust?', a: 'Users make different judgments about content/decisions depending on whether they know an AI was involved — being upfront about AI usage (and its known limitations, like the possibility of hallucination) sets appropriate expectations and lets users apply appropriate scrutiny, rather than assuming AI-generated content carries the same reliability guarantees as a human expert.' },
  ],
  'Human-in-the-loop for high-stakes decisions': [
    { q: 'Why should high-stakes decisions (hiring, lending, medical) generally keep a human meaningfully in the loop rather than being fully automated by AI?', a: 'AI models can be confidently wrong, can encode biases from training data, and lack full accountability/context that a human reviewer can bring — for decisions with significant consequences for individuals, a human review/override step provides a safety check against AI errors and an avenue for appeal, rather than an unaccountable, fully automated decision with no recourse.' },
  ],
  'Data privacy considerations when using AI APIs': [
    { q: 'What privacy considerations arise when sending user data to a third-party LLM API?', a: 'You need to understand the provider\'s data retention and training-usage policies (does sending data risk it being used to train future models, or retained longer than necessary), avoid sending unnecessary PII in prompts, consider data residency/compliance requirements (GDPR, etc.), and ensure your terms of service and privacy policy accurately disclose this third-party data sharing to users.' },
  ],
  'Copyright and intellectual property concerns with generative AI': [
    { q: 'What IP concerns should a team consider before shipping a generative AI feature?', a: 'Whether the underlying model was trained on data with unclear licensing/copyright status (an active area of legal uncertainty), whether generated output could closely reproduce copyrighted training material, and whether the ownership of AI-generated content itself is legally clear for your use case — these are evolving legal areas, so consulting with legal counsel on specific generative AI use cases (rather than assuming standard copyright rules apply cleanly) is prudent.' },
  ],
};
