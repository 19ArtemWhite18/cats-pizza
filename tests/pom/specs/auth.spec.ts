import { test } from '../../fixtures/app.fixture.ts';
import { CleanupApi } from '../api/CleanupApi.ts';
import { testUsers } from '../data/testData.ts';

test.describe('Auth', () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) return;
    const cleanupApi = new CleanupApi(request);
    await cleanupApi.deleteUserByEmail(createdUserEmail);
    createdUserEmail = null;
  });

  test('Sign in', async ({ homePage, authModal }) => {
    await homePage.open();
    await authModal.signIn(testUsers.existing.email, testUsers.existing.password);
    await authModal.assertSignedIn();
  });

  test('Sign up', async ({ homePage, authModal }) => {
    createdUserEmail = `${Date.now()}@test.ru`;

    await homePage.open();
    await authModal.signUp('Tecт', createdUserEmail, testUsers.existing.password);
    await authModal.assertSignedIn();
  });
});
