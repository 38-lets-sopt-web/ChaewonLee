import styled from '@emotion/styled'

export default function InfoCard({title, value}) {
    return (
        <CardWrapper>
            <CardTitle>{title}</CardTitle>
            <CardValue>{value}</CardValue>
        </CardWrapper>

    )
}

const CardWrapper = styled.div `
    display: flex;
    flex-direction: column;
    jutify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-radius: ${({theme}) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.bgCard};
`

const CardTitle = styled.h2 `
    font-size: ${({theme}) => theme.typography.size.subtitle};
    font-weight: ${({theme}) => theme.typography.weight.regular};
`

const CardValue = styled.h3 `
    font-size: ${({theme}) => theme.typography.size.score};
    font-weight: ${({theme}) => theme.typography.weight.bold};
`