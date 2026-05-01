import styled from '@emotion/styled';
import { useRanking } from '../hooks/useRanking'; 

export default function RankingPage() {
    const { rankings, handleReset } = useRanking();

    return (
        <RankingContainer>
            <RankingHeader>
                <Title>두더지 잡기 랭킹 보드</Title>
                <ResetBtn onClick={handleReset}>기록 초기화</ResetBtn>
            </RankingHeader>
            
            <RankingTable>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>레벨</th>
                        <th>점수</th>
                        <th>성공 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.length > 0 ? (
                        rankings.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>Level {item.level}</td>
                                <td>{item.score}점</td>
                                <td>{item.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">아직 기록이 없습니다. 첫 기록을 세워보세요!</td>
                        </tr>
                    )}
                </tbody>
            </RankingTable>
        </RankingContainer>
    );
}

const RankingContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 36px;
    gap: 24px;
    background: ${({ theme }) => theme.colors.bgCard};
    border-radius: ${({theme}) => theme.borderRadius.md};
`;

const RankingHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;         
`;

const Title = styled.h1`
    font-size: ${({theme}) => theme.typography.size.subtitle};
    font-weight: ${({theme}) => theme.typography.weight.bold};
    color: ${({ theme }) => theme.colors.textMain};
`;

const RankingTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: ${({ theme }) => theme.colors.bgCard};
    border-radius: ${({theme}) => theme.borderRadius.md};
    overflow: hidden;

    th, td {
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
    }

    th {
        background: ${({ theme }) => theme.colors.secondary};
        color: white;
    }

    tr:last-child td { border: none; }
`;

const ResetBtn = styled.button`
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textMain};
    border-radius: ${({theme}) => theme.borderRadius.md};
    font-weight: ${({theme}) => theme.typography.weight.bold};
    &:hover { opacity: 0.8; }
`;