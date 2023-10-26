def test_model_movie_create(db, movie_factory):
    movie = movie_factory()
    assert movie.id

def test_model_user_create(db, user_factory):
    user = user_factory()
    assert user.username

def test_model_st88rating_create(db, st88rating_factory):
    rating = st88rating_factory()
    assert rating.id

def test_model_st88description_create(db, st88description_factory):
    description = st88description_factory()
    assert description.id

