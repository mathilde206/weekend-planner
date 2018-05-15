from django.test import TestCase
from .models import Recommendation
from django.utils.text import slugify

class TestRecommendations(TestCase):
    def test_create_slug(self):
        """
        When I save an instance of Recommendation, the rigth slug is created
        """
        item1 = Recommendation(
            title = 'Very Cool Title',
            draft = True,
            content_day1='hello'
        )
        item1.save()

        self.assertEquals(item1.slug, 'very-cool-title')

        # Create an item with the same title
        item2 = Recommendation(
            title = 'Very Cool Title',
            draft = True,
            content_day1='hello'
        )
        item2.save()

        # We get the last instance in the db with the same slug
        id = Recommendation.objects.filter(slug= slugify(item2.title)).order_by('-id').first().id

        self.assertEquals(item2.slug, 'very-cool-title-{}'.format(id))


    def test_getting_active_users(self):
        """
        This test verifies that we are only retrieving recommendations which are not draft
        """
        draft = Recommendation(
            title = 'draft',
            draft = True,
            content_day1='hello'
        )
        draft.save()

        self.assertFalse(Recommendation.objects.active().exists())

        not_draft = Recommendation(
            title='not draft',
            content_day1='hello'
        )

        not_draft.save()

        self.assertEquals(Recommendation.objects.active().count(), 1)

    def test_recommendation_as_string(self):
        """
        Checks that the string version of the recommendation is the title
        """
        test = Recommendation(
            title='great title',
            content_day1='hello'
        )
        test.save()

        self.assertEquals('great title', str(test))

    def test_get_content_type(self):
        """
        Tests we are getting the right content_type for recommendations
        """
        test = Recommendation(
            title='great title',
            content_day1='hello'
        )
        test.save()

        self.assertEquals('recommendation', str(test.get_content_type))
