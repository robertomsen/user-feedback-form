import { test, expect } from '@playwright/test';

test.describe('Feedback Form E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('envía feedback válido', async ({ page }) => {
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Email').fill('juan@example.com');
    await page.getByLabel('Comentarios').fill('Esto es genial!');
    await page.getByLabel('Acepto los términos').check();
    await page.getByRole('button', { name: /enviar/i }).click();

    await expect(page.getByRole('status')).toHaveText(/gracias por tu feedback/i);
  });

  test('valida errores con campos vacíos', async ({ page }) => {
    await page.getByRole('button', { name: /enviar/i }).click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is invalid/i)).toBeVisible();
    await expect(page.getByText(/comment must be at least/i)).toBeVisible();
    await expect(page.getByText(/terms must be accepted/i)).toBeVisible();
  });

  test('muestra mensaje de error si falla el servidor', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });

    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Email').fill('juan@example.com');
    await page.getByLabel('Comentarios').fill('Esto es genial!');
    await page.getByLabel('Acepto los términos').check();
    await page.getByRole('button', { name: /enviar/i }).click();

    await expect(page.getByRole('alert')).toHaveText(/error del servidor/i);
  });

  test('muestra estado de "Enviando..." durante el submit', async ({ page }) => {
    await page.route('**/feedback', async route => {
      await new Promise(res => setTimeout(res, 1500));
      await route.fulfill({ status: 200, body: '{}' });
    });

    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Email').fill('juan@example.com');
    await page.getByLabel('Comentarios').fill('Esto es genial!');
    await page.getByLabel('Acepto los términos').check();

    const submitBtn = page.getByRole('button', { name: /enviar/i });
    await expect(submitBtn).toBeVisible();

    await submitBtn.click();

    await expect(page.getByRole('button')).toHaveText(/enviando/i);
  });
});
