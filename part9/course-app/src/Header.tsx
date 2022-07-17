interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  const { courseName } = props;

  return <h1>{courseName}</h1>;
};

export default Header;
