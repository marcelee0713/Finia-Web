# Finia-Web

## Introduction

Finia is a way to simply manage your revenue and expenses, it is like a personal financial manager. Users can visualize and track their transactions through **graphs**, **analyzed information about your transactions** and, especially the **table** where you can add, update, and delete. It is also CSV Exportable so you can easily take out your transaction data through Excel.

## How to contribute

If you want to contribute here are the steps. I assume that you've already followed the instructions of [Finia Server](https://github.com/marcelee0713/Finia-Server).

### Environment Variables

```
# Change the port same as your server
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

### Installation

1. Install Packages
   - `npm install`
2. Build
   - `npm run build`
3. Seed the database
   - `npm run dev`
4. Production
   - `npm run start`

### Docker Usage

1. Build Image
   - `docker build -t finia/front-end:v1 .`
2. Run Image
   - `docker run -p 3000:3000 finia/front-end:v1`
