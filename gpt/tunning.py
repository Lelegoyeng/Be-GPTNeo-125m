from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments
from datasets import load_dataset
import torch

model_name = "EleutherAI/gpt-neo-125M"

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
if tokenizer.pad_token_id is None:
    tokenizer.pad_token = tokenizer.eos_token

# Load dataset
dataset = load_dataset('json', data_files='dataset.json', split='train')

# Preprocessing function
def preprocess_data(batch):
    combined_texts = [
        prompt + " " + completion
        for prompt, completion in zip(batch['prompt'], batch['completion'])
    ]
    encodings = tokenizer(
        combined_texts,
        truncation=True,
        padding="max_length",
        max_length=128
    )
    encodings['labels'] = encodings['input_ids']  # Labels untuk pelatihan
    return encodings

# Preprocess dataset
tokenized_dataset = dataset.map(preprocess_data, batched=True)

# Load model
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float32)

# Training arguments
training_args = TrainingArguments(
    output_dir="./fine_tuned_model",
    overwrite_output_dir=True,
    num_train_epochs=20,
    per_device_train_batch_size=1,
    learning_rate=5e-5,
    logging_dir="./logs",
    save_steps=100,
    save_total_limit=1
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
)

# Train the model
trainer.train()

# Save fine-tuned model
model.save_pretrained("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")
