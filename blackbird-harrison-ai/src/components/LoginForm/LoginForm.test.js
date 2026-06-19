import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';

const fillAndSubmit = (email, password) => {
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { name: 'email', value: email } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: password } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
};

test('renders sign in page', () => {
  render(<LoginForm />);
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

test('shows success snackbar when email and password are valid', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'Abcdef1!');
  expect(screen.getByText('Login Successful')).toBeInTheDocument();
});

test('shows email error for invalid email format', () => {
  render(<LoginForm />);
  fillAndSubmit('notanemail', 'Abcdef1!');
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

test('shows email error when email is empty', () => {
  render(<LoginForm />);
  fillAndSubmit('', 'Abcdef1!');
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});

test('shows password error when password is too short', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'Ab1!');
  expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
});

test('shows password error when password has no uppercase letter', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'abcdef1!');
  expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
});

test('shows password error when password has no lowercase letter', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'ABCDEF1!');
  expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
});

test('shows password error when password has no number', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'Abcdefg!');
  expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
});

test('shows password error when password has no special character', () => {
  render(<LoginForm />);
  fillAndSubmit('user@example.com', 'Abcdef12');
  expect(screen.getByText('Password must contain at least one special character')).toBeInTheDocument();
});

test('shows both email and password errors when both are invalid', () => {
  render(<LoginForm />);
  fillAndSubmit('bademail', 'short');
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
});

test('does not show success when validation fails', () => {
  render(<LoginForm />);
  fillAndSubmit('bademail', 'short');
  expect(screen.queryByText('Login Successful')).not.toBeInTheDocument();
});
