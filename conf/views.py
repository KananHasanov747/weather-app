from django.views.generic import TemplateView

class FrontEndView(TemplateView):
    template_name = "index.html"

    # def get_context_data(self, **kwargs):
    #     return { 'context_data': 'value' }
