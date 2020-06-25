/**
 * Set/clear attributes (class/ID/style) from HTML elements
 */

function addClass(element, class_name)
{
    element.classList.add(class_name);
}

function removeClass(element, class_name)
{
    element.classList.remove(class_name);
}

function toggleClass(element, class_name)
{
    element.classList.toggle(class_name);
}

function rollDice()
{
    let dice_image = document.getElementById('dice-roll-image');

    toggleClass(dice_image, 'dice-image-blank');
    toggleClass(dice_image, 'dice-image-rolling');
    
    if (dice_image.classList.contains('dice-image-blank'))
    {
        dice_image.src = "https://rpg.karthik.site/dice/assets/img/d20-dice-blank-100.png"
    }
    else if (dice_image.classList.contains('dice-image-rolling'))
    {
        dice_image.src = "https://rpg.karthik.site/dice/assets/img/d20-dice-rolling-100.gif"
    }
}