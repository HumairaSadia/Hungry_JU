import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '@/components/auth/RegisterForm';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe('RegisterForm', () => {
  test('toggles password visibility (AC-14)', async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText('Password *');
    expect(passwordInput).toHaveAttribute('type', 'password');
    await userEvent.click(screen.getAllByLabelText('Show password')[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('shows error when passwords do not match (AC-06)', async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText('Full Name *'), 'Jane Doe');
    await userEvent.type(screen.getByLabelText('Email Address'), 'jane@example.com');
    await userEvent.type(screen.getByLabelText('Profile Photo URL *'), 'https://x.com/p.jpg');
    await userEvent.selectOptions(screen.getByRole('combobox'), 'female');
    await userEvent.type(screen.getByLabelText('Password *'), 'Password@123');
    await userEvent.type(screen.getByLabelText('Confirm Password *'), 'Different@123');
    await userEvent.click(screen.getByLabelText(/accept the terms/i));
    await userEvent.click(screen.getByRole('button', { name: /submit registration/i }));
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
