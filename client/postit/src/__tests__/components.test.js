/**
 * @jest-environmentjsdom
 */
import '@testing-library/jest-dom';
import {render,screen} from '@testing-library/react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
describe('Testing the SignUp component',()=>{
    test('renders the sign up component',()=>{
        render(<SignUp />);
        const inputNode  = screen.getByPlaceholderText('Username');
        expect(inputNode).toBeInTheDocument();
        });
})

describe('Testing the SigIn component',()=>{
    test('renders the signin component',()=>{
        render(<SignIn />);
        const inputNode  = screen.getByPlaceholderText('Username');
        expect(inputNode).toBeInTheDocument();
        });
})
