import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/login/page'

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
            push: jest.fn(),
        };
    },
}));

// Mock useAuthStore
jest.mock('@/store/authStore', () => ({
    useAuthStore: () => ({
        login: jest.fn(),
        isAuthenticated: false,
    })
}));

describe('Login Page', () => {
    it('renders login form properly', () => {
        render(<LoginPage />)

        expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument()
    })

    it('allows entering email and password', () => {
        render(<LoginPage />)

        const emailInput = screen.getByPlaceholderText('john@example.com');
        const passwordInput = screen.getByPlaceholderText('********');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    })
})
