
btn.onclick=function()
{
    if(!document.getElementById('img'))
    {
        var image=document.createElement('img');
        image.id="img";
        image.src="https://thiscatdoesnotexist.com/";
        document.body.appendChild(image)
    }
};

