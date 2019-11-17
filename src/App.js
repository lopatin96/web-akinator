import React from 'react';
import './App.css';
import {Button, Container, Row, Col, ButtonGroup} from 'bootstrap-4-react';
import Lottie from 'react-lottie';
import wizard1 from './lottie/wizard1'
import wizard2 from './lottie/wizard2'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'main',
            question: null
        };

        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.doAnswer = this.doAnswer.bind(this);
        this.showQuestion = this.showQuestion.bind(this);

        this.state.session = window.pl.create();

        let pp = //sdsd
            "get_questions(Q) :-" +
            "Q = ['Is it a man?', 'Is your person dead?', 'Has children?', 'Comedian actor?', 'Older than 50', 'Bald?', 'Was/Is a president?', 'Black?'].";

        let pr = // Products
            "item(id(1), name(bread))." +
            "item(id(2), name(water))." +
            "item(id(3), name(apple))." +
            // Shops
            "shop(id(1), name(tau), location(spain))." +
            "shop(id(2), name(swi), location(netherlands))." +
            // Stock
            "stock(item(1), shop(1), count(23), price(0.33))." +
            "stock(item(2), shop(1), count(17), price(0.25))." +
            "stock(item(2), shop(2), count(34), price(0.31))." +
            "stock(item(3), shop(2), count(15), price(0.45)).";

        let program =
            "get_questions(Q) :-" +
            "Q = ['Is it a man?', 'Is your person dead?', 'Has children?', 'Comedian actor?', 'Older than 50', 'Bald?', 'Was/Is a president?', 'Black?']." +
            "get_facts(F) :-" +
            "F = [man, dead, has_children, actor_comedian, older_than_50, bald, was_is_president, black]." +
            "man(jim_carrey)." +
            "has_children(jim_carrey)." +
            "actor_comedian(jim_carrey)." +
            "older_than_50(jim_carrey)." +
            "man(donald_trump)." +
            "has_children(donald_trump)." +
            "older_than_50(donald_trump)." +
            "was_is_president(donald_trump)." +
            "man(barack_obama)." +
            "has_children(barack_obama)." +
            "older_than_50(barack_obama)." +
            "was_is_president(barack_obama)." +
            "black(barack_obama)." +
            "dead(marilyn_monroe)." +
            "man(bruce_willis)." +
            "has_children(bruce_willis)." +
            "older_than_50(bruce_willis)." +
            "bald(bruce_willis)." +
            "get_people(P) :-" +
            "P = [jim_carrey, donald_trump, barack_obama, marilyn_monroe, bruce_willis]." +

            "q(F) :-" +
            "get_facts(F)." +

            "start :-" +
            "write`ln('Hi')," +
            "get_facts(F)," +
            "get_questions(Q)," +
            "get_people(P)," +
            "loop_entry(F, Q, P)." +

            "loop_entry([], [], People) :-" +
            "    write('It can be one of ')," +
            "    writeln(People)." +

            "loop_entry([F|Facts], [Y|Ys], People) :-" +
            "    writeln(Y)," +
            "    read(Answer),  % 1 - Yes; 0 - No; anything else - I don't know" +
            "    filter(Answer, F, People, Result)," +
            "    length(Result, L)," +
            "    (" +
            "        L > 1 ->" +
            "        loop_entry(Facts, Ys, Result)" +
            "        ;" +
            "        write('I think it\\'s ')," +
            "        write(Result)" +
            "    )." +

            " filter(Answer, F, People, Result) :-" +
            "     (   Answer =:= 1 -> include(F, People, Result)" +
            "     ;   Answer =:= 0 -> exclude(F, People, Result)" +
            "     ;   Result = People" +
            "     ).";

        this.state.session.consult(pp);
        // session.answer((x) => console.log(window.pl.format_variable(x)));
    }

    componentDidMount() {
        // session.query("man(donald_trump).");
        // console.log('jim ');
        // session.answers(x => console.log(x));

        // session.query( "item(id(ItemID), name(bread)), stock(item(ItemID), shop(ShopID), _, price(Price)), shop(id(ShopID), name(Shop), _)." );
        // session.answers( x => console.log( window.pl.format_answer(x) ) );

        this.state.session.query("get_questions(Q).");
        this.state.session.answers(this.showQuestion());
    }

    showQuestion() {
        return function(answer) {
            if (window.pl.type.is_substitution(answer)) {
                let question = answer.lookup("Q");
                console.log("121231 ", question['args'][0]['id']);
                this.setState({question: question['args'][0]['id']}, () => console.log('okokok'));
            }
        }.bind(this);
    }

    doAnswer(answer) {
        console.log(answer)
    }

    changeCurrentPage(page) {
        this.setState({currentPage: page})
    }

    render() {
        const lottieWizard1 = {
            loop: true,
            autoplay: true,
            animationData: wizard1
        };

        const lottieWizard2 = {
            loop: true,
            autoplay: true,
            animationData: wizard2
        };

        return (
            <Container>
                <Row mt={5}>
                    <Col>
                        {
                            this.state.currentPage === 'main' ? (
                                    <div>
                                        <div style={{textAlign: 'center'}} className="magic">
                                            <p>Hello! I am a Mind Reader!</p>
                                            <p>And I can read minds</p>
                                            <p>Do not believe? Now you will see this</p>
                                        </div>
                                        <Lottie style={{width: 300, height: 300}} options={lottieWizard1}
                                                height={300}
                                                width={300}/>
                                        <div style={{textAlign: 'center'}}>
                                            <Button primary lg onClick={() => this.changeCurrentPage('game')}>I'm
                                                ready</Button>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div>
                                        <div style={{textAlign: 'center'}} className="magic">
                                            <p>Ok now I will show you...</p>
                                            <p>Think of any famous person</p>
                                            <p>and answer my questions</p>
                                        </div>
                                        <Lottie style={{width: 300, height: 300}} options={lottieWizard2}
                                                height={300}
                                                width={300}/>
                                        <p style={{textAlign: 'center', fontSize: 25 }}>{this.state.question}</p>
                                        <div style={{textAlign: 'center'}}>
                                            <ButtonGroup lg>
                                                <Button danger as="label" onClick={() => this.doAnswer('no')}>
                                                    No
                                                </Button>
                                                <Button warning as="label" onClick={() => this.doAnswer('idk')}>
                                                    I Don't Know
                                                </Button>
                                                <Button success as="label" onClick={() => this.doAnswer('yes')}>
                                                    Yes
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <Button danger outline sm onClick={() => this.changeCurrentPage('main')}>
                                                Finish the Game</Button>
                                        </div>
                                    </div>

                                )
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default App;
