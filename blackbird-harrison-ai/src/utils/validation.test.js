import { validateEmail, validatePassword } from './validation';

// --- Email validation ---

describe('validateEmail', () => {
  test('returns error for empty email', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  test('returns error for missing @ symbol', () => {
    expect(validateEmail('invalidemail.com')).toBe('Please enter a valid email address');
  });

  test('returns error for missing domain', () => {
    expect(validateEmail('user@')).toBe('Please enter a valid email address');
  });

  test('returns error for missing local part', () => {
    expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
  });

  test('returns no error for valid email', () => {
    expect(validateEmail('user@example.com')).toBe('');
  });

  test('returns no error for valid email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe('');
  });
});

// --- Password validation ---

describe('validatePassword', () => {
  test('returns error for empty password', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  test('returns error when password is shorter than 8 characters', () => {
    expect(validatePassword('Ab1!')).toBe('Password must be at least 8 characters');
  });

  test('returns error when password has no uppercase letter', () => {
    expect(validatePassword('abcdef1!')).toBe('Password must contain at least one uppercase letter');
  });

  test('returns error when password has no lowercase letter', () => {
    expect(validatePassword('ABCDEF1!')).toBe('Password must contain at least one lowercase letter');
  });

  test('returns error when password has no number', () => {
    expect(validatePassword('Abcdefg!')).toBe('Password must contain at least one number');
  });

  test('returns error when password has no special character', () => {
    expect(validatePassword('Abcdef12')).toBe('Password must contain at least one special character');
  });

  test('returns no error for a valid password', () => {
    expect(validatePassword('Abcdef1!')).toBe('');
  });

  test('returns no error for valid password with multiple special characters', () => {
    expect(validatePassword('MyP@ss#123')).toBe('');
  });
});
