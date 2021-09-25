import { Layout, Typography } from 'antd';

import './Article.css';

function Article() {

    return (
        <div className="Article">
            <Typography.Title level={3} >Vierwaldstättersee: Bootsfahrten und Wassersport ab Dienstag erlaubt</Typography.Title>
            <Typography.Text>19. Juli 2021, 21:08 Uhr</Typography.Text>
            <Typography.Paragraph>
            Der Pegelstand des Vierwaldstättersees ist am Montag weiter gesunken – langsam, aber beständig. Deswegen sind ab morgen Dienstag private Bootsfahrten und Wassersport wieder möglich. Die Behörden mahnen dennoch zur Vorsicht. Der Kanton Zug rät unter anderem wegen der tiefen Wassertemperature noch davon ab, ins Wasser zu gehen. Die Kursschiffe werden auf dem Vierwaldstättersees jedoch bis mindestens Mittwochabend nicht fahren, wie die Schifffahrtsgesellschaft des Vierwaldstättersees auf ihrer Internetseite schreibt.
            </Typography.Paragraph>
        </div>
    );
}

export default Article;