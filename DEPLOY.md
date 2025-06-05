# Instruções para Deploy na Vercel

Para fazer o deploy deste projeto na Vercel, siga estas etapas:

1. Crie uma conta na [Vercel](https://vercel.com) caso ainda não tenha

2. Faça o upload do projeto para um repositório Git (GitHub, GitLab ou Bitbucket)
   - Caso ainda não tenha feito isso, você pode criar um novo repositório e fazer o upload:
   ```bash
   cd "caminho/para/o/projeto"
   git init
   git add .
   git commit -m "Primeiro commit"
   git remote add origin URL_DO_SEU_REPOSITORIO
   git push -u origin main
   ```

3. Na Vercel, clique em "Add New..." e selecione "Project"

4. Conecte sua conta do provedor Git (se ainda não estiver conectada)

5. Selecione o repositório que contém este projeto

6. Na configuração do projeto:
   - Framework Preset: Vite
   - Build Command: deixe em branco (usará o padrão do vercel.json)
   - Output Directory: deixe em branco (usará o padrão do vercel.json)
   - Install Command: deixe em branco para usar o padrão (`npm install`)

7. Clique em "Deploy"

A Vercel iniciará o processo de build e deploy. Ao finalizar, você receberá uma URL onde o aplicativo estará disponível (por exemplo, `seu-projeto.vercel.app`).

Você também pode configurar um domínio personalizado seguindo as instruções na seção "Domains" das configurações do projeto.

## Variáveis de Ambiente (se necessário)

Se o projeto precisar de variáveis de ambiente para funcionar corretamente, você pode adicioná-las na seção "Environment Variables" das configurações do projeto na Vercel.
