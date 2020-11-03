const twitterLink = 'https://twitter.com/5aitama1'
const githubLink = 'https://github.com/5aitama';

$(document).ready(() => {
    
    const menuItems = $('.menu ul li');
    const sections = $('section');

    var lastOffsetY = 0;

    MenuHighlight(menuItems, sections, lastOffsetY);
    
    $(document).scroll( () => MenuHighlight(menuItems, sections, lastOffsetY));

    // When menu item is selected
    for(var i = 0; i < menuItems.length; i++)
    {
        const item = $(menuItems[i])
        let index = i;
        item.click(function() {
            $('html, body').animate( { scrollTop: $(sections[index]).offset().top }, 1000, 'easeInOutExpo')
            // $(document).scrollTop($(sections[index]).offset().top);
        })
    }

    $('[twitter]').click(() => window.open(twitterLink));
    $('[github]').click(() => window.open(githubLink));
});

function MenuHighlight(menuItems, sections, lastOffsetY)
{
    const offsetY = $(document).scrollTop() + $(window).innerHeight() / 2;

    // The direction of scroll
    // const dir = (lastOffsetY - offsetY) == 0 ? 0 : (lastOffsetY - offsetY) <= -1 ? -1 : 1;

    lastOffsetY = offsetY;

    var index = -1;

    for(var i = sections.length - 1; i >= 0; i--)
    {
        const Top = $(sections[i]).offset().top;
        const Bot = Top + $(sections[i]).innerHeight();
        const marg = $(sections[i]).innerHeight() * 0.05; // 5% of the height of the sections[i]

        // Check if offsetY is inside the section margin
        if(offsetY >= Top + marg && offsetY <= Bot - marg)
        {
            index = i;
            break;
        }
    }

    if(index == -1)
        return;
    
    for(var j = 0; j < menuItems.length; j++)
    {
        const o = $(menuItems[j]);

        if(index != j)
            o.removeAttr("selected")
        else
            o.attr('selected', '')
    }
}