import sys
from transformers import AutoModelForCausalLM, AutoTokenizer

# model_name = "./fine_tuned_model"
model_name = r"D:\APP-ANY\Be-GPTNeo-125m\gpt\fine_tuned_model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def generate_text(prompt, max_length=50):
    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(
        inputs.input_ids,
        attention_mask=inputs.attention_mask,
        max_length=max_length,
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No prompt provided")
        sys.exit(1)

    prompt = sys.argv[1]
    response = generate_text(prompt)
    print(response) 
