# Node.js ViaCEP API

This project is a simple Node.js API that retrieves address information in JSON format from the ViaCEP service based on a provided postal code (CEP). It is designed for easy consumption by developers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nodejs-viacep-api.git
   ```

2. Navigate to the project directory:
   ```
   cd nodejs-viacep-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add any necessary environment variables.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The API will be running on `http://localhost:3000`.

## API Endpoint

- **GET** `/cep/:cep`
  
  Replace `:cep` with the postal code you want to look up. This endpoint will return the address information in JSON format.

### Example Request

```
GET http://localhost:3000/cep/01001-000
```

### Example Response

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7087"
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.