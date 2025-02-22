function Footer() {
  return (
    <footer className="mt-20">
      <div className="flex gap-20">
        <div>
          <h1 className="text-black bg-[#FFCE04]">☕ The News</h1>
          <p>tudo que você precisa saber pra começar seu dia bem e informado</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Início</h3>
          <a>Posts</a>
          <a>Newsletters</a>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">fale conosco</h3>
          <a>anuncie no the news</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
