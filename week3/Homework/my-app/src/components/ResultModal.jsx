import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

export default function ResultModal({ score, isOpen }) {
    if (!isOpen) return null;
    const isSuccess = score >= 0;


    return createPortal(
        <ModalOverlay>
            <ModalContent>
                <Title>{isSuccess ? 'SUCCESS!' : 'FAIL!'}</Title>
                <Message>당신의 최종 점수는?</Message>
                <Score>{score}점</Score>
                <SubMessage>3초 뒤에 게임이 초기화됩니다...</SubMessage>
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;   
    height: 100vh;  
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.bgContent};
    padding: 50px;
    width: 400px;
    min-height: 300px;
    border-radius: ${({theme}) => theme.borderRadius.md};
    text-align: center;
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.textMain};
    font-size: ${({ theme }) => theme.typography.size.title};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    margin-bottom: 10px;
`;

const Message = styled.p`
    font-size: ${({ theme }) => theme.typography.size.subtitle};
    font-weight: ${({ theme }) => theme.typography.weight.regular};
    color: ${({ theme }) => theme.colors.textSub} ;
`;

const Score = styled.div`
    font-size: ${({ theme }) => theme.typography.size.body};
    font-weight: ${({ theme }) => theme.typography.weight.regular};
    color: ${({ isSuccess, theme }) => isSuccess ? theme.colors.success : theme.colors.error};
    margin: 20px 0;
`;

const SubMessage = styled.p`
    font-size: ${({ theme }) => theme.typography.size.body};
    color: ${({ theme }) => theme.colors.textSub};
`;