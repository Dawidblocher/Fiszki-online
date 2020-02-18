import React from 'react';
import { Link} from 'react-router-dom';

const EntrySite = () => {
    return (
        <div className="entrySite">
            <h1>Ucz się na fiszkach gdziekolwiek jesteś!</h1>
            <p>Twórz własne paczki z fiszkami lub skorzystaj ze standardowych</p>
            <Link className="redBtn" to={"/home"} >
                Przejdz do Aplikacji
            </Link>
        </div>
    );
}

export default EntrySite;