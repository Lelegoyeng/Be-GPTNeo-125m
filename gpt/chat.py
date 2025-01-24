from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "./fine_tuned_model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def generate_text(prompt, max_length=50):
    print(f"Prompt: {prompt}") 
    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(
        inputs.input_ids,
        attention_mask=inputs.attention_mask,
        max_length=max_length,
        # temperature=0.0,
        # do_sample=False
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print(f"AI Response: {response}") 
    return response

# Prompt untuk pengujian
prompt = "berapa jumlah karyawan?"
response = generate_text(prompt)