import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles((theme: Theme) => createStyles({
//login, registration, change password
    authPaper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    authAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    authForm: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    authSubmit: {
        margin: theme.spacing(3, 0, 2),
    },
    authTextFieldStyle: {
        height: '65px',
    },
//PacksListTable / CardsTable
    table: {
        minWidth: '700px',
    },
    tableHead: {
        backgroundColor: 'lightblue',
    },
    packsListTableBodyNavLink: {
        textDecoration: 'none',
        color: 'black'
    },
    packsListTableBodyActionsSection: {
        display: 'flex',
        width: '224px',
        justifyContent: 'flex-end',
    },
    footerPage: {
        display: 'flex',
        height: '53px',
        marginLeft: '10px',
        alignItems: 'center',
    },
//PacksList
    addNewPackButton: {
        width: '230px',
        marginLeft: '20px',
    },
//input
    input: {
        height: '40px',
        marginRight: '15px'
    },
//Navbar
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        minWidth: '200px',
        backgroundColor: 'lightblue',
        borderRadius: '4px 0px 0px 4px',
    },
    navbarShowPacksCards: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '10px',
    },
    navbarMyAllButtons: {
        marginTop: '20px',
    },
//cards
    container: {
        padding: '0 12px',
    },
    paper: {
        marginTop: '20px',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '600px',
        minWidth: '1000px',
    },
    body: {
        margin: '10px 12px',
        padding: '0 12px',
    },
    addNewCardButton: {
        width: '330px',
    },
    packsCardsFooter: {
        marginTop: '20px',
    },
//cardsTableActions
    actionsButtonOfCards: {
        marginRight: '10px',
    },
    containerActionsButton: {
        width: '166px',
        padding: '16px 0',
    },
//learnCardsModalQuestion
    showAnswerButton: {
        margin: '30px auto 0',
        width: '160px',
    },
//learnCardsModalAnswer
    optionsForRateYourself: {
        margin: '5px 30px',
        display: 'inline-flex',
    },
    nextQuestionButton: {
        margin: '30px auto 0',
        width: '100px',
    },
//AddCardModal
    questionInput: {
        width: '450px',
    },
    answerInput: {
        width: '450px',
        marginTop: '30px',
    },
    addNewCardModalButton: {
        width: '150px',
        marginTop: '20px',
    },
//AddPackModal
    addEditPackInput: {
        margin: '30px 0 50px 0',
    },
}))