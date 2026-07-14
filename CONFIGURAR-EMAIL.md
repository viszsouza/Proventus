# 📧 Como Configurar o Envio de E-mail — Proventus

O formulário usa o **EmailJS** (https://emailjs.com) — funciona sem backend,
direto do navegador. Plano gratuito: até **200 envios/mês**.

---

## 1. Criar conta

Acesse https://www.emailjs.com e clique em **Sign Up**.
Use o mesmo e-mail da Proventus: `provpromocoes@gmail.com`

---

## 2. Conectar o Gmail da Proventus

1. No painel, vá em **Email Services → Add New Service**
2. Escolha **Gmail**
3. Clique em **Connect Account** e autorize com `provpromocoes@gmail.com`
4. Em **Service Name** coloque: `Proventus`
5. Clique em **Create Service**
6. Copie o **Service ID** gerado (ex: `service_abc123`)

---

## 3. Criar o Template de E-mail

1. Vá em **Email Templates → Create New Template**
2. Preencha assim:

**To Email:** `{{to_email}}`
**From Name:** `{{from_name}} via Site Proventus`
**Reply To:** `{{reply_to}}`
**Subject:** `[ORÇAMENTO] {{service}} — {{from_name}}`

**Body (HTML):**

```html
<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1a1a1a">

  <div style="background:#e0282c;padding:28px 32px">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:0.04em">
      NOVA SOLICITAÇÃO DE ORÇAMENTO
    </h1>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px">
      Recebido em {{sent_at}} via site proventuspromo.com.br
    </p>
  </div>

  <div style="background:#f9f9f9;padding:32px">

    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;width:38%;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Nome</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px;font-weight:600">
          {{from_name}}
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">E-mail</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">
          <a href="mailto:{{from_email}}" style="color:#e0282c">{{from_email}}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">WhatsApp / Tel.</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">
          <a href="https://wa.me/55{{phone}}" style="color:#e0282c">{{phone}}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Empresa</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{company}}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Tipo de Serviço</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee">
          <span style="background:#e0282c;color:#fff;padding:4px 10px;font-size:13px;font-weight:700;border-radius:2px">
            {{service}}
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Cidades / Estados</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{states}}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Data Prevista</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{event_date}}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Público Estimado</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{audience}}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Orçamento</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{budget}}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top">
          <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Como Conheceu</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px">{{source}}</td>
      </tr>
    </table>

    <div style="margin-top:28px">
      <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:10px">
        Briefing do Projeto
      </p>
      <div style="background:#fff;border:1px solid #e8e8e8;border-left:3px solid #e0282c;padding:18px 20px;font-size:15px;line-height:1.65;color:#333;white-space:pre-wrap">
        {{message}}
      </div>
    </div>

    <div style="margin-top:28px;text-align:center">
      <a href="mailto:{{from_email}}"
         style="display:inline-block;background:#e0282c;color:#fff;padding:14px 32px;font-weight:700;font-size:14px;letter-spacing:0.05em;text-decoration:none;text-transform:uppercase">
        RESPONDER AGORA
      </a>
    </div>

  </div>

  <div style="background:#141414;padding:18px 32px;text-align:center">
    <p style="color:#666;font-size:12px;margin:0">
      Proventus Promoções · provpromocoes@gmail.com · (81) 9 9983-5246
    </p>
  </div>

</div>
```

3. Clique em **Save** e copie o **Template ID** (ex: `template_xyz789`)

---

## 4. Pegar a Public Key

1. No painel, clique no seu nome (canto superior direito) → **Account**
2. Em **API Keys**, copie a **Public Key** (ex: `abc123XYZ`)

---

## 5. Colar as credenciais no site

Abra o arquivo `contato.html` e localize estas 3 linhas (início do script):

```js
const EMAILJS_PUBLIC_KEY  = "SUA_PUBLIC_KEY_AQUI";
const EMAILJS_SERVICE_ID  = "SEU_SERVICE_ID_AQUI";
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID_AQUI";
```

Substitua pelos valores reais:

```js
const EMAILJS_PUBLIC_KEY  = "abc123XYZ";        // ← sua Public Key
const EMAILJS_SERVICE_ID  = "service_abc123";   // ← seu Service ID
const EMAILJS_TEMPLATE_ID = "template_xyz789";  // ← seu Template ID
```

Salve o arquivo e faça o upload para o servidor.

---

## 6. Testar

1. Acesse a página de contato no navegador
2. Preencha o formulário e clique em **Enviar Solicitação**
3. Verifique a caixa de entrada de `provpromocoes@gmail.com`

Se o e-mail chegar: ✅ tudo configurado.
Se não chegar: verifique o painel do EmailJS → **Activity** para ver logs de erro.

---

## Observações

- **Limite gratuito:** 200 e-mails/mês. Para mais, plano pago a partir de US$ 15/mês.
- **Spam:** o Gmail pode marcar como spam inicialmente — confirme no painel que o domínio está autorizado.
- **Segurança:** a Public Key é pública por design (fica no HTML). Restrinja o domínio autorizado em **Account → API Keys → Allowed Origins**: `https://seudominio.com.br`
- **Backup:** mesmo sem o EmailJS configurado, o formulário valida corretamente e exibe mensagem de erro orientando o usuário ao WhatsApp.
