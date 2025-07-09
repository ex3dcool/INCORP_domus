using Microsoft.AspNetCore.Mvc.Razor;
using System.Collections.Generic;
using System.Linq;

public class CustomViewLocationExpander : IViewLocationExpander
{
	public void PopulateValues(ViewLocationExpanderContext context) { }

	public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
	{
		var customLocations = new[]
		{
            // ✅ Vistas por áreas IMOC 3.2
            "~/Areas/{2}/{1}/Views/Home/{0}.cshtml",
			"~/Areas/{2}/Views/{1}/{0}.cshtml",
			"~/Areas/{2}/Views/Shared/{0}.cshtml",
			"~/Views/{1}/{0}.cshtml",
			"~/Views/Shared/{0}.cshtml",

		};

		return customLocations.Concat(viewLocations);
	}
}
