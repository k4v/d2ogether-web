/**
 * Set/clear attributes (class/ID/style) from HTML elements
 */

function addClass(element, class_names)
{
    for (let i=0; i<class_names.length; i++)
    {
        element.classList.add(class_names[i]);
    }
}

function removeClass(element, class_names)
{
    for (let i=0; i<class_names.length; i++)
    {
        element.classList.remove(class_names[i]);
    }
}

function toggleClass(element, class_names)
{
    for (let i=0; i<class_names.length; i++)
    {
        element.classList.toggle(class_names[i]);
    }
}

function rollDice()
{
    let dice_image = document.getElementById('dice-roll-image');

    toggleClass(dice_image, ['dice-image-blank']);
    toggleClass(dice_image, ['dice-image-rolling']);
    
    if (dice_image.classList.contains('dice-image-blank'))
    {
        dice_image.src = "assets/img/d20-dice-blank-100.png"
    }
    else if (dice_image.classList.contains('dice-image-rolling'))
    {
        dice_image.src = "assets/img/d20-dice-rolling-100.gif"
    }
}

function setAdvantage(icon_element)
{
    adv_icons = document.getElementsByClassName('adv-icon');

    for (let i=0; i < adv_icons.length; i++)
    {
        if (icon_element == adv_icons[i])
        {
            icon_element.style['opacity'] = (0.2 - window.getComputedStyle(icon_element).opacity) + 1;
        }
        else
        {
            adv_icons[i].style['opacity'] = 0.2;
        }
    };
}